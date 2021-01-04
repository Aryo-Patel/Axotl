
import React, {Fragment} from 'react';
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
    let className = this.props.className;
  }

  componentDidMount(){
    if(this.props.location){
      this.setState({address: this.props.location})
    }
  }

  componentDid

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address: address })
    this.props.onChange(address);
  };

  render() {
    return (
      <Fragment>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className = {`${this.props.parentClassName}__form-group`}>
              <input 
                {...getInputProps({
                  placeholder: this.props.realPlaceholder,
                  className: `location-search-input ${this.props.className}`,
                })}
                 required/>
              <label className={`${this.props.parentClassName}__locationLabel`}></label>
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

      </Fragment>
    );
  }
}

export default LocationInput;