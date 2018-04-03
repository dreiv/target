import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { setUpTestBed } from '../test.common.spec';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture;
  let app;

  setUpTestBed(<TestModuleMetadata>{
    declarations: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));


  it(`should have articles`, async(() => {
    expect(app.articles).toBeTruthy;
  }));
  
  it('should have three preset articles', async(() => {
    expect(app.articles.length).toEqual(3);
  }));
});
