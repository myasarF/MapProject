import React, {  useEffect, useState, useRef } from "react";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";
import {
	Map,
	TileLayer,
	FeatureGroup,
	GeoJSON
} from "react-leaflet";


const apiUrl = 'http://localhost:2330/api/'



const MapWithDrawing = () => {

	const [JsonArray, setJsonArray] = useState([]);
	const initialRender = useRef(true);


	const _onEdited = e => {
		let numEdited = 0;
		e.layers.eachLayer(layer => {
			numEdited += 1;
		});
		console.log('_onEdited: edited ${numEdited} layers', e);
	};

	const mapConfig = {
		lat: 31.046051,
		lng: 34.851612,
		zoom: 10
	};

	const _onCreated = e => {
        debugger
		let type = e.layerType;
		let layer = e.layer;
		if (type === "marker") {

			console.log("_onCreated: marker created", e);
		} else {
			
			
			console.log("_onCreated: something else created:", type, e);
		}

		console.log("Geojson", layer.toGeoJSON());

		let newArray = [...JsonArray]

		newArray.push(layer.toGeoJSON())

		setJsonArray(newArray)
	
		//layer.bindPopup(bounds.getNorthWest().toString() +  " NW<br>" + bounds.getSouthEast().toString() + " SE");
	};

	const _onDeleted = e => {
		let numDeleted = 0;
		e.layers.eachLayer(layer => {
			numDeleted += 1;
		});

	};


	const _onDrawStart = e => {
		console.log("_onDrawStart", e);
	};



	const onFeatureGroupAdd = (e) => {

		this.refs.map.leafletElement.fitBounds(e.target.getBounds());
	}


	const getData = async () => {
		axios.get(apiUrl + 'Shape/', {
			params: {
			}
		})
			.then(res => {
				console.log(res.data)
				setJsonArray(res.data)


			})
			.catch(err => {
				console.log(err)
			})
	}


	const GeoData = () => {

		useEffect(() => {

			if (initialRender.current == false) {

			} else {
				initialRender.current = false;
				getData();
			}

		}, []);

	
		if (JsonArray) {
		
			return <GeoJSON data={JsonArray} />;
		} else {
			return null;
		}
	};


	const save = () => {
		
		const obj = {
			"shapesData": JSON.stringify(JsonArray),
		}


		axios.post(apiUrl + 'Shape/', obj)
			.then((response) => {
				console.log(response);

			}, (error) => {
				console.log(error);

			});
	}


	const ClearMap = () => {
		setJsonArray([])
	};

	const createLayersFromJson =(data)=>{
		debugger
		//Handel Circle
	//   let layers = [];
	
	//   forEach(data, (geo, id) => {

	//   });
	  
	//   return layers;
	};
	

	useEffect(() => {

		

	}, [initialRender]);

	
	return (

		<div id="wrapper">
			<div id="first">

				<Map center={[mapConfig.lat, mapConfig.lng]} zoom={mapConfig.zoom} >

					<FeatureGroup>
						<EditControl
							onDrawStart={_onDrawStart}
							position="topright"
							onEdited={_onEdited}
							onCreated={_onCreated}
							onDeleted={_onDeleted}
							onFeatureGroupAdd={onFeatureGroupAdd}
						
							draw={{
								polyline: {
									icon: new L.DivIcon({
										iconSize: new L.Point(8, 8),
										className: "leaflet-div-icon leaflet-editing-icon"
									}),
									shapeOptions: {
										guidelineDistance: 10,
										color: "navy",
										weight: 3
									}
								},
								rectangle: true,
								circlemarker: false,
								circle: true,
								polygon: true
							}}
						/>
					</FeatureGroup>
					<GeoData />
					<TileLayer
						attribution="Tiles &copy; Carto"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

				</Map>


			</div>


			<div id="second">
				<div>
					<button id='btnSave' onClick={save} className='button'> Save </button>
				</div>
				<div >
					<button id='btnClear' onClick={ClearMap.bind(this)} className='button'> Clear Map </button>
					<button id='btn' onClick={getData.bind(this)} className='button'> Get Data From DB  </button>
				</div>
			</div>


		</div>
	);
};


export default MapWithDrawing;
