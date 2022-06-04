import {Map, GoogleApiWrapper, InfoWindow, Marker, Circle, DistanceMatrixService} from "google-maps-react";
import React, {Component} from "react";
import config from "../cofig";
import InspectorInformation from "./InspectorInformation";
import Tractor from '../static/tractor (3).png'



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
            searchDistance: 30.00,
            count:0,
            activeMarkerEmail: null,
            activeMarkerPhoneNumber: null
            }
        };
    
    componentDidMount(){
        this.calculateDistance()
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

    handleClickOpen = (evt) => {
        this.setState({isOpen:true})
        this.setState({activeMarker:this.state.inspectorInfo[evt.index]})
        this.setState({activeMarkerEmail: `mailto: ${this.state.inspectorInfo[evt.index].email}`})
        this.setState({activeMarkerPhoneNumber: `tel: ${this.state.inspectorInfo[evt.index].phoneNumber}`})
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
                let letter = String.fromCharCode("A".charCodeAt(0) + index)
                return   <Marker  key={index} icon={"http://maps.google.com/mapfiles/marker" + letter + ".png"} index={index} value={index} onClick={this.handleClickOpen} position = {{lat:inspector.lat , lng: inspector.lng}} inspector={inspector}>
                        </Marker> 
                    
            }
        })
        let total = markerDeets.length;
        for (let i=0; i<markerDeets.length; i++){
            if(markerDeets[i] === undefined){
                total -=1
            }
        } this.setState({count: total})
        this.setState({markerDetails: markerDeets})
    }

    

    updateInspectorInfo = () => {
        let temp = [...this.state.inspectorInfo]
        for (let i=0; i<temp.length; i++){
            const distanceInMiles = (this.state.distanceResponse.rows[0].elements[i].distance.value/1600).toFixed(2);
            temp[i].distance = parseFloat(distanceInMiles)
        } 
        temp.sort(function(a,b){return a.distance - b.distance})
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
            this.setState({isOpen:false})
        }

        const handleDecreaseClick = () => {
            this.setState({searchDistance:this.state.searchDistance-5})
            this.setState({isOpen:false})
        }

        return(
            <div className="map">
            <h2>Found {this.state.count} inspectors within {this.state.searchDistance} miles</h2>
            
            <div className="map-container">
            <button onClick={handleIncreaseClick}>Increase Search Radius</button>
            <button onClick={handleDecreaseClick}>Decrease Search Radius</button>
                <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{lat:location.lat, lng:location.lng}}
                >
               
                <Marker icon={Tractor} visible={true} position={{lat:location.lat, lng:location.lng}} >
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
                                <li><span className="bold">Name: </span>{this.state.activeMarker.name}</li>
                                <li><span className="bold">Address: </span>{this.state.activeMarker.address}</li>
                                <li><span className="bold">Postcode: </span>{this.state.activeMarker.postcode}</li>
                                <li><span className="bold">Distance: </span>{this.state.activeMarker.distance} miles</li>
                                <li><span className="bold">Phone: </span><a href={this.state.activeMarkerPhoneNumber}>{this.state.activeMarker.phoneNumber}</a></li>
                                <li><span className="bold">Email: </span><a href={this.state.activeMarkerEmail}>{this.state.activeMarker.email}</a></li>
                            </ul>
                       
                    </div>
                </InfoWindow> : null}

            </Map>
            </div>
            <div>

                 <InspectorInformation searchDistance = {this.state.searchDistance} inspectorsInfo={this.state.inspectorInfo}/>
            
            </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: config.API_KEY
})(MapComponent);;