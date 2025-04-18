import { useAppSelector } from '@redux/hooks';
import { getResultStepData } from '@entities/Order';
import { ResultPayment } from './ResultPayment';
import { ResultContacts } from './ResultContacts';
import { ResultDelivery } from './ResultDelivery';
import { ResultStepTypeProps } from './TypeProps';

export const ResultStep = ({ activeStep }: ResultStepTypeProps): JSX.Element => {
  const { stepDelivery, stepContacts, stepPayment } = useAppSelector(getResultStepData);
  if (!stepDelivery && !stepContacts && !stepPayment) {
    return null;
  }

  return (
    <div>
      { activeStep === 'delivery' && stepDelivery && <ResultDelivery/>}
      { activeStep === 'contacts' && stepContacts && <ResultContacts/>}
      { activeStep === 'payment' && stepPayment && <ResultPayment/>}
    </div>
  );
};
