
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        address: '',
    };
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address: address })
    this.props.onChange(address);
  };
 
  render() {
    return (
    <div class="container">
        <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input
                {...getInputProps({
                    placeholder: 'Search Locations ...',
                    className: 'location-search-input',
                })}
                />
                <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                    <div
                        {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                        })}
                    >
                        <span>{suggestion.description}</span>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
        
      </div>
    );
  }
}

export default LocationInput;