export const fetchData = async () => {
    const response = await fetch('https://eng-soft-proj-back.vercel.app/');
    const data = await response.json();
    console.log(data);
  };