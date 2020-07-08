/* stores API key */
const apiKey = 'XpHmDDa3CdsjDM9-UUnxUXR2OMDW6-5FEA7h-EmRqjsQcm-SmVaNHqRWCJrJPfV0B3dbL0avtj6nsKhM4qVfUpp5MXkubFjFRMKetA_UYpwLiVMp27MfZ6l-Yq7HWnYx';

/*
* Creates new Yelp object pulling data from the Yelp API
*/
const Yelp = {
  /* searches yelp API for relavent information */
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
