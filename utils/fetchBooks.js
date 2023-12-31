export async function fetchBooksData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching book names
    const bookNamesURL = `${apiBaseUrl}/api/library/getBookNames`;
    console.log('Fetching URL (fetchBooks.js) for: ', bookNamesURL);

    const bookNamesResponse = await fetch(bookNamesURL);
    if (!bookNamesResponse.ok) {
      throw new Error('Failed to fetch book names');
    }

    const bookNamesData = await bookNamesResponse.json();
    console.log('Received Book Names (fetchBooks.js): ', bookNamesData);

    // Construct the URL for fetching book text
    const textURL = `${apiBaseUrl}/api/library/getText?bookNames=${encodeURIComponent(JSON.stringify(bookNamesData))}`;
    console.log('Fetching response for getText.js (fetchBooks.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching book image
    const imageURL = `${apiBaseUrl}/api/library/getImage?bookNames=${encodeURIComponent(bookNamesData)}`;
    console.log('Fetching response for getImage.js (fetchBooks.js): ', imageURL);
    const imageResponse = await fetch(imageURL);

    // Check if the responses are successful
    if (!textResponse.ok || !imageResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const textData = await textResponse.json();
    const imageData = await imageResponse.json();

    console.log('Text Data:', textData);
    console.log('Image Data:', imageData);

    // Combine text and image data
    const combinedBooks = combineTextAndImage(textData, imageData, bookNamesData);

    return combinedBooks;
  } catch (error) {
    console.error('Error fetching books (fetchBooks.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, bookNamesData) {
  // Convert imageData to an array of book objects
  const imageBooksArray = imageData.signedUrls;

  // Convert textData to an array of book objects
  const textBooksArray = Object.values(textData);

  // Combine the filtered data
  const combinedBooks = textBooksArray.map((textBook) => {
    const matchingImageBook = imageBooksArray.find((imageBook) =>
      imageBook[0].toLowerCase().includes(`${textBook.name.toLowerCase()}.jpg`)
    );
    return {
      ...textBook,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageBook ? matchingImageBook[0] : null,
    };
  });

  return combinedBooks;
}