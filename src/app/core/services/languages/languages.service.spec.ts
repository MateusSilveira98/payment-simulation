import { TestBed } from '@angular/core/testing';
import { CoreModule } from '@core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { FORM_CONTROL_VALIDATOR_VOCABULARY } from '../form-control-validator/form-control-validator.service.vocabulary';
import { LanguageService } from './languages.service';

xdescribe('LanguageService', () => {
  let languageService: LanguageService;
  let translate: TranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [LanguageService, TranslateService],
    });

    languageService = TestBed.get(LanguageService);
    translate = TestBed.get(TranslateService);
  });

  it('should get context of FormControlValidatorService', () => {
    languageService
      .getContext(
        'core-context',
        'services-context',
        'form-control-validator-context'
      )
      .subscribe((context: any) => {
        console.log('context', context);
        expect(context.required).toContain(
          FORM_CONTROL_VALIDATOR_VOCABULARY.required
        );
        expect(context.minLength).toContain(
          FORM_CONTROL_VALIDATOR_VOCABULARY.minLength
        );
      });
  });

//   xit('should get context of UserCardComponent', async () => {
//     const context: UserCardContext = await languageService.getContext(
//       'shared-context',
//       'components-context',
//       'user-card-context'
//     );
//     expect(context.id).toContain(USER_CARD_VOCABULARY.id);
//     expect(context.username).toContain(USER_CARD_VOCABULARY.username);
//   });

//   xit('should get context of HeaderComponent', async () => {
//     const context: HeaderContext = await languageService.getContext(
//       'shared-context',
//       'components-context',
//       'header-context'
//     );
//     expect(context.themeSwitcher).toContain(HEADER_VOCABULARY.themeSwitcher);
//     expect(context.title).toContain(HEADER_VOCABULARY.title);
//     expect(context['userFilter-all']).toContain(
//       HEADER_VOCABULARY['userFilter-all']
//     );
//   });

//   xit('should get context of AppComponent', async () => {
//     const context: AppContext = await languageService.getContext('app-context');
//     console.log(context);
//     expect(context['snackBar-close']).toContain(
//       APP_VOCABULARY['snackBar-close']
//     );
//   });
});
