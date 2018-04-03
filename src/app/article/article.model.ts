export class Article {
  private _title: string;
  public get title(): string {
    return this._title;
  }

  private _link: string;
  public get link(): string {
    return this._link;
  }

  private _votes: number;
  public get votes(): number {
    return this._votes;
  }

  constructor($title: string, $link: string, $votes: number = 0) {
    this._title = $title;
    this._link = $link;
    this._votes = $votes;
  }

  upvote() {
    this._votes++;
  }

  downvote() {
    this._votes--;
  }

  // domain() is a utility function that extracts
  // the domain from a URL, which we'll explain shortly
  domain(): string {
    try {
      // e.g. http://foo.com/path/to/bar
      const domainAndPath: string = this.link.split('//')[1];
      // e.g. foo.com/path/to/bar
      return domainAndPath.split('/')[0];
    } catch (err) {
      return null;
    }
  }
}
