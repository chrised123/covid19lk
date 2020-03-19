import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private urlMeta = 'og:url';
  private titleMeta = 'og:title';
  private descriptionMeta = 'og:description';
  private imageMeta = 'og:image';
  private secureImageMeta = 'og:image:secure_url';
  private twitterTitleMeta = 'twitter:text:title';
  private twitterImageMeta = 'twitter:image';

  constructor(private titleService: Title, private metaService: Meta) { }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  public setSocialMediaTags(url: string, title: string, description: string): void {
    const imageUrl = './../assets/images/corona.jpg';
    const tags = [
      new MetaTag(this.urlMeta, url, true),
      new MetaTag(this.titleMeta, title, true),
      new MetaTag(this.descriptionMeta, description, true),
      new MetaTag(this.imageMeta, imageUrl, true),
      new MetaTag(this.secureImageMeta, imageUrl, true),
      new MetaTag(this.twitterTitleMeta, title, false),
      new MetaTag(this.twitterImageMeta, imageUrl, false)
    ];
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      const tag = siteTag.isFacebook ?
        this.metaService.getTag(`property='${siteTag.name}'`) : this.metaService.getTag(`name='${siteTag.name}'`);
      if (siteTag.isFacebook) {
        this.metaService.updateTag({ property: siteTag.name, content: siteTag.value });
      } else {
        this.metaService.updateTag({ name: siteTag.name, content: siteTag.value });
      }
    });
  }

  ngOnInit() {
    this.setTitle('Covid19 Srilanka Tracker');
    this.setSocialMediaTags(
      'https://covid19lk.azurewebsites.net',
      'Covid19 Srilanka Tracker',
      'Covid19 Srilanka Tracker Page');
  }
}

export class MetaTag {
  name: string;
  value: string;
  isFacebook: boolean;

  constructor(name: string, value: string, isFacebook: boolean) {
      this.name = name;
      this.value = value;
      this.isFacebook = isFacebook;
  }
}
