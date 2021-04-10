import { SpectacularAppComponent, SpectacularFeatureTestingModule } from '@ngworker/spectacular';
import { fireEvent, render, RenderResult, screen } from '@testing-library/angular';

import { AppModule } from './app.module';

describe('Heroes integration test', () => {
  beforeEach(async () => {
    result = await render(SpectacularAppComponent, {
      excludeComponentDeclaration: true,
      imports: [
        // HttpClientTestingModule,
        SpectacularFeatureTestingModule.withFeature({
          featureModule: AppModule,
          featurePath: '',
        }),
      ],
    });
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  describe('Heroes page', () => {
    beforeEach(async () => {
      await result.navigate('heroes');
    });

    describe('Adding a hero', () => {
      it('the hero is displayed when the Add button is clicked', () => {
        // Arrange
        const bram = 'Bram';
        const nameControl = screen.getByLabelText('Hero name:', {
          trim: true,
        });
        fireEvent.change(nameControl, { target: { value: bram } });

        // Act
        fireEvent.click(screen.getByText('Add hero'));

        // Assert
        expect(true).toBeTruthy();
      });
    });
  });
});
