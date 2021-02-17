import { Injectable } from '@angular/core';
import { ptLang } from '@core/languages/languages.lang';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class LanguageService {
  constructor(private translate: TranslateService) {}

  getContext(
    mainContext: string,
    sectionContext?: string,
    targetContext?: string
  ): Observable<unknown> {
    return this.getBaseVocabulary(
      mainContext,
      sectionContext,
      targetContext
    ).pipe(
      map((baseContext) => {
        console.log('baseContext', baseContext);
        return this.getAttributesPath(
          baseContext,
          mainContext,
          sectionContext,
          targetContext
        );
      })
    );
  }

  getAttributesPath(
    context: any,
    mainContext: string,
    sectionContext: string,
    targetContext: string
  ) {
    console.log('ATTRIBUTES', context);
    Object.keys(context).forEach((prop) => {
      context[prop] = this.buildContextStringPath(
        mainContext,
        sectionContext,
        targetContext,
        prop
      );
    });
    return context;
  }

  buildContextStringPath(
    mainContext: string,
    sectionContext: string,
    targetContext: string,
    prop: string
  ): string {
    return `${mainContext}.${sectionContext}.${targetContext}.${prop}`;
  }

  getBaseVocabulary(
    mainContext: string,
    sectionContext?: string,
    targetContext?: string
  ): Observable<unknown> {
    return from(this.translate.getTranslation(ptLang)).pipe(
      switchMap((vocabulary) => {
        if (!sectionContext) {
          return vocabulary[mainContext];
        }

        if (!targetContext) {
          return vocabulary[mainContext][sectionContext];
        }

        return vocabulary[mainContext][sectionContext][targetContext];
      })
    );
  }

  translateInstant(expression: string) {
    return this.translate.instant(expression);
  }
}
