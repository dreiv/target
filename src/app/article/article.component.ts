import { Article } from './article.model';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() article: Article;

  upvote(): boolean {
    this.article.upvote();
    return false;
  }

  downvote(): boolean {
    this.article.downvote();
    return false;
  }

  delete(): boolean {
    this.article = null;
    return false;
  }
}
