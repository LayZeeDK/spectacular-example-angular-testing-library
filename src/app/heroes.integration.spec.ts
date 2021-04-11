import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { SpectacularAppComponent, SpectacularFeatureTestingModule } from '@ngworker/spectacular';
import { fireEvent, render, RenderResult, screen } from '@testing-library/angular';

import { FakeHeroService } from './fake-hero.service';
import { HeroService } from './hero.service';
import { HeroesModule } from './heroes.module';

describe('Heroes integration test', () => {
  beforeEach(async () => {
    result = await render(SpectacularAppComponent, {
      excludeComponentDeclaration: true,
      imports: [
        HttpClientTestingModule,
        SpectacularFeatureTestingModule.withFeature({
          featureModule: HeroesModule,
          featurePath: 'heroes',
        }),
      ],
      providers: [{ provide: HeroService, useClass: FakeHeroService }],
    });
    result.fixture.autoDetectChanges(true);
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  describe('Heroes page', () => {
    beforeEach(async () => {
      await result.navigate('heroes');
    });

    describe('Adding a hero', () => {
      it('the hero is displayed when the Add button is clicked', fakeAsync(() => {
        // Arrange
        const bram = 'Bram';
        const nameControl = screen.getByLabelText('Hero name:', {
          trim: true,
        });
        fireEvent.input(nameControl, { target: { value: bram } });

        // Act
        fireEvent.click(screen.getByRole('button', { name: 'Add hero' }));
        tick();

        // Assert
        expect(
          screen.queryByText(new RegExp(bram), {
            selector: '.heroes a',
          })
        ).not.toBeNull();
      }));
    });
  });
});
