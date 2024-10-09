'use client';
import { Box, Backdrop } from '@mui/material';
import { useSignInForm } from '@/lib/schemas/authSchemas';
import { SignInFormInputs } from '@/lib/definitions';
import { useSignIn } from '@/hooks/auth/useSignIn';
import Loading from '@/components/common/Loading';
import EmailInput from '../auth/common/EmailInput';
import PasswordInput from '../auth/common/PasswordInput';
import RememberMeInput from '../auth/common/RememberMeInput';
import ActionButton from '../auth/common/ActionButton';
import SecondaryActionButton from '../auth/common/SecondaryActionButton';
import AuthPopup from '../auth/common/AuthPopup';
import TitleAndSubtitle from '../auth/common/TitleAndSubtitle';

const BoxContainerStyles = {
  width: { md: '960px', xs: '360px' },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  pt: { md: '208px', xs: '94px' },
  bgcolor: 'common.white',
};

const BoxInputStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  mt: '90px',
};

const BoxRememberMeStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { handleSignIn, openDialog, closeDialog, message, isLoading } =
    useSignIn();

  const submitData = async (data: SignInFormInputs) => {
    await handleSignIn(data);
  };

  return (
    <>
      <Backdrop open={isLoading} sx={{ zIndex: 99 }}>
        <Loading color="common.white" circularColor="secondary.main" />
      </Backdrop>
      <Box sx={BoxContainerStyles}>
        <TitleAndSubtitle
          title="Welcome back"
          subtitle="Welcome back! Please enter your details to log into your account."
        />
        <Box sx={{ width: { md: '436px', xs: '320px' } }}>
          <form
            onSubmit={handleSubmit(submitData)}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />

            <Box sx={BoxRememberMeStyles}>
              <RememberMeInput register={register} />
              <SecondaryActionButton
                btnText="Forgot password?"
                goto="/auth/forgot-password"
              />
            </Box>
            <Box sx={BoxInputStyles}>
              <ActionButton text="Sign in" isLoading={isLoading} />
              <SecondaryActionButton
                text="Don't have an account? "
                btnText="Sign up"
                goto="/auth/sign-up"
              />
            </Box>
          </form>
        </Box>
      </Box>
      <AuthPopup
        openDialog={openDialog}
        setOpenDialog={closeDialog}
        title="Sign in error"
        message={message}
        btnText1={message.includes('Invalid') ? 'Try again' : 'Ok'}
      />
    </>
  );
};

export default SignInForm;
