import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

/*
* Creates a new BuesinessList react component.
*/
class BusinessList extends React.Component {
  /* renders BuesinessList object */
  render() {
    return (
      <div className="BusinessList">
        {
          this.props.businesses.map(business => {
            return <Business business={business} key={business.id} />
          })
        }
      </div>
    );
  }
}

export default BusinessList;
