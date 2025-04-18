import { useCallback } from 'react';
import { Block } from '@ui-kit/Block';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { getModelData, getResultStepData, orderActions } from '@entities/Order';
import { WrapperStepTypeProps } from './TypeProps';
import { ResultStep, StepType } from './ResultStep';
import { results, stepOrder } from '@app/entities/Delivery';

import classNames from 'classnames';

import styles from './WrapperStep.module.scss';

export const WrapperStep = ({ children, title, ActiveStep, result, dataTestId }: WrapperStepTypeProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { step } = useAppSelector(getModelData);
  const { stepDelivery } = useAppSelector(getResultStepData);

  const setResult = useCallback(() => {
    if (ActiveStep === 1) {
      dispatch(orderActions.setResultStep({ key: results[1], value: null }));
      dispatch(orderActions.setResultStep({ key: results[2], value: null }));
      dispatch(orderActions.setResultStep({ key: results[3], value: null }));
    } else if (ActiveStep === 2) {
      dispatch(orderActions.setResultStep({ key: results[2], value: null }));
      dispatch(orderActions.setResultStep({ key: results[3], value: null }));
    } else {
      dispatch(orderActions.setResultStep({ key: results[ActiveStep], value: null }));
    }
    dispatch(orderActions.setModel({ key: 'step', value: stepOrder[ActiveStep] }));
    dispatch(orderActions.setModel({ key: stepOrder[ActiveStep], value: null }));
  }, [step]);

  const open = step === stepOrder[ActiveStep] || (ActiveStep === 1 && !stepDelivery);
  return (
    <Block className={classNames(styles.Container, open && styles.Open, result && styles.Active)}>
      <div className={styles.Title} data-testid={dataTestId}>
        <span>{ActiveStep}</span>
        {title}
        {result && !open && <div onClick={setResult} className={styles.Change}>Изменить</div>}
      </div>
      { open &&
        <div className={classNames(styles.Content, open && styles.Active)}>
          {children}
        </div>
      }
      <ResultStep activeStep={stepOrder[ActiveStep] as StepType} />
    </Block>
  );
};
