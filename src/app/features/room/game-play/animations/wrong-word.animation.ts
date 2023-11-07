import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const wrongWordAnimation = trigger('wrongWordAnimation', [
  transition(':increment', [
    query('.field', [
      animate(
        '200ms ease-in',
        style({ backgroundColor: 'rgba(240, 30,  70, 0.1)' })
      ),
    ]),
  ]),
]);
