import axios from 'axios';

export const generateDescription = async (productTitle: string) => {
  try {
    const response = await axios.post('/api/chat', {
      messages: [
        {
          role: 'user',
          content: `generate description for: ${productTitle}`,
        },
      ],
    });

    const { data: { text } } = response;

    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};
