import { Injectable } from '@angular/core';
import { Operations } from './global.constant';
import { action, observable } from 'mobx';
@Injectable()
export class OperationBaseStore {
    @observable operation = Operations.notStarted;
    @observable data = null;
    @observable error = null;
    onstart;
    params;
    constructor() { }

    @action
     start = async (params?) => {
        this.data = null;
        this.params = params;
        this.operation = Operations.pending;
        if (this.onstart) { // put fun check
            await this.onstart(params)
            .then(
                (data) => {
                    this.data = data;
                    this.operation = Operations.completed;
                },
                (error) => {
                    this.operation = Operations.error;
                    this.error = error;
                }
            ).catch((error) => {
                this.operation = Operations.error;
                // this.error = error;
            });
        }
    }

    @action
    reset = () => {
        this.operation = Operations.notStarted;
        this.data.start(this.params);
    }

    @action
    end = () => {
        this.operation = Operations.notStarted;
        this.data = null;
    }
}
