'use client';

import React from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import ResetPasswordForm from '@/components/auth/resetPassword/ResetPasswordForm';

const ResetPasswordFormContainer: React.FC = () => {
  const code = useQueryParams('code') || '';

  return <ResetPasswordForm code={code} />;
};

export default ResetPasswordFormContainer;
