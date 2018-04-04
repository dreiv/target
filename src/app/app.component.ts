import { Article } from './article/article.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Jenkins', 'http://jenkins.io/', 1),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 5)
    ];
  }

  addArticle(titleEl: HTMLInputElement, linkEl: HTMLInputElement): boolean {
    const title = titleEl.value;
    const link = linkEl.value;
    console.log(`Adding article: ${title} and link: ${link}`);
    this.articles.push(new Article(title, link));

    titleEl.value = '';
    linkEl.value = '';
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

  removeArticle(article) {
    this.articles = this.articles.filter(art => art !== article);
  }
}
