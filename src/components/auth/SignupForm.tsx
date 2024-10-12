'use client';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser';
import { SignUpFormData } from '@/lib/definitions';
import { useSignupForm } from '@/lib/schemas/signUpSchema';
import { Backdrop, Box } from '@mui/material';
import Loading from '@/components/common/Loading';
import PasswordInput from '../auth/common/PasswordInput';
import ConfirmPasswordInput from '../auth/common/ConfirmPasswordInput';
import EmailInput from '../auth/common/EmailInput';
import NameInput from '../auth/common/NameInput';
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

const SignupForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useSignupForm();

  const { mutate, setOpenDialog, openDialog, message, isPending } =
    useRegisterUser();

  const submitData = (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <>
      <Backdrop open={isPending} sx={{ zIndex: 99 }}>
        <Loading color="common.white" circularColor="secondary.main" />
      </Backdrop>
      <Box sx={BoxContainerStyles}>
        <TitleAndSubtitle
          title="Create an account"
          subtitle="Create an account to get an easy access to your dream shopping"
        />
        <Box sx={{ width: { md: '436px', xs: '320px' } }}>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            onSubmit={handleSubmit(submitData)}
          >
            <NameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <ConfirmPasswordInput register={register} errors={errors} />

            <Box sx={BoxInputStyles}>
              <ActionButton isLoading={isPending} text={'Sign up'} />
              <SecondaryActionButton
                text={'Already have an account? '}
                btnText={'Sign in'}
                goto={'/auth/sign-in'}
              />
            </Box>
          </form>
        </Box>
      </Box>
      <AuthPopup
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="Sign up info"
        btnText1={message.includes('successfully') ? 'Ok' : 'Try again'}
        goto1={message.includes('successfully') ? '/auth/sign-in' : ''}
        goto2="/auth/sign-in"
        btnText2={message.includes('successfully') ? '' : 'Go to sign in'}
        message={message}
      />
    </>
  );
};

export default SignupForm;
