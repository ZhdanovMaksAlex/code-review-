import { ReactNode } from 'react';

export interface WrapperStepTypeProps {
  children?: ReactNode;
  title: string;
  ActiveStep?: number;
  result?: any;
  dataTestId?: string;
}
