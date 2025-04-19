export const sendVerificationCode = async (email) => {
	const res = await fetch('http://localhost:5000/api/auth/send-code', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ email }),
	});
  
	if (!res.ok) {
	  throw new Error('Ошибка при отправке кода');
	}
  
	return res.json(); 
  };
  