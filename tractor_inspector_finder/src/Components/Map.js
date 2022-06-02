import {Map, GoogleApiWrapper, InfoWindow, Marker, Circle, DistanceMatrixService} from "google-maps-react";
import React, {Component} from "react";
import config from "../cofig";
import InspectorInformation from "./InspectorInformation";



export class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inspectorLocations: props.inspectorLatLong,
            inspectorInfo: props.inspectorDestinations,
            distanceResponse: null,
            markerDetails: null,
            isOpen:false,
            activeMarker:null,
            searchDistance: 10.00
            }
        };
    
    componentDidMount(){
        this.calculateDistance()
    }

    handleClickOpen = (evt) => {
        this.setState({isOpen:true})
        this.setState({activeMarker:this.state.inspectorInfo[evt.index]})
        console.log(evt.index)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.distanceResponse !== prevState.distanceResponse){
            this.updateInspectorInfo()
        }
        if(this.state.inspectorInfo !== prevState.inspectorInfo){
            console.log("updated")
            this.setMarkers()
        }
        if(this.state.searchDistance !== prevState.searchDistance){
            this.setMarkers()
        }
    }

    setMarkers = () => {
        const markerDeets = this.state.inspectorInfo.map((inspector, index) => {
            if(inspector.distance < this.state.searchDistance){
            return   <Marker  key={index} index={index} value={index} onClick={this.handleClickOpen} position = {{lat:inspector.lat , lng: inspector.lng}} inspector={inspector}>
                    </Marker>
            }
                
        })
        this.setState({markerDetails: markerDeets})
    }

    calculateDistance = () => {
        const {google} = this.props;
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins:this.props.tractorLocationData,
                destinations:this.state.inspectorLocations,
                travelMode:"DRIVING"
            },
            (response, status) => {
                console.log("response", response);
                this.setState({distanceResponse: response})
                console.log("status", status)
            }
        )
    }

    updateInspectorInfo = () => {
        let temp = [...this.state.inspectorInfo]

        for (let i=0; i<temp.length; i++){
            //convert distance into miles and format here before saving it to object
            const distanceInMiles = (this.state.distanceResponse.rows[0].elements[i].distance.value/1600).toFixed(2);
            temp[i].distance = distanceInMiles
        } 
        this.setState({inspectorInfo : temp})
    }

    render() {
        const mapStyles = {
            width: '50%',
            height: '50%',
            // marginTop:'15rem'
        };

        const location = this.props.tractorLocationData[0]

        const handleIncreaseClick = () => {
            this.setState({searchDistance:this.state.searchDistance+5})
        }

        const handleDecreaseClick = () => {
            this.setState({searchDistance:this.state.searchDistance-5})
        }

        return(
            <>
            <button onClick={handleIncreaseClick}>Increase Search Radius</button>
            <button onClick={handleDecreaseClick}>Decrease Search Radius</button>
            <h2>{this.state.searchDistance} miles</h2>
            <div className="map-container">
            
                <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{lat:location.lat, lng:location.lng}}
                >
                
                <Marker icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'} visible={true} position={{lat:location.lat, lng:location.lng}} >
                </Marker>
                <Circle
                    center={{
                        lat:location.lat,
                        lng:location.lng
                    }}
                    radius={this.state.searchDistance*1600}
                    options="strokeColor: #ffffff"
                    />
                {this.state.markerDetails}

                {this.state.isOpen === true ? <InfoWindow 
                inspector={this.state.activeMarker} 
                position = {{lat:this.state.activeMarker.lat , lng:this.state.activeMarker.lng }}
                visible={true}>
                    <div>
                        <h3>Info</h3>
                        <ul>
                            <li>{this.state.activeMarker.name}</li>
                            <li>{this.state.activeMarker.address}</li>
                            <li>{this.state.activeMarker.postcode}</li>
                            <li>{this.state.activeMarker.distance}</li>
                            <li>{this.state.activeMarker.phoneNumber}</li>
                            <li>{this.state.activeMarker.email}</li>
                        </ul>
                </div></InfoWindow> : null}

            </Map>
            </div>
            <div>

                 <InspectorInformation inspectorsInfo={this.state.inspectorInfo}/>
            
            </div>
            </>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: config.API_KEY
})(MapComponent);;