import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const VerifyEmail = () => {
  const [status, setStatus] = useState('loading');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

  const renderContent = () => {
    if (status === 'loading') {
      return <p>Verifying your email...</p>;
    }
    if (status === 'success') {
      return (
        <div>
          <h2>Email Verified!</h2>
          <p>You can now log in to your account.</p>
          <button onClick={() => router.push('/auth/sign-in')}>Go to Login</button>
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div>
          <h2>Verification Failed</h2>
          <p>The link may have expired or is invalid. Please try again.</p>
          <button onClick={() => router.push('/auth/resend-verification')}>Resend Verification</button>
        </div>
      );
    }
  };

  return <div className="verification-page">{renderContent()}</div>;
};

export default VerifyEmail;
