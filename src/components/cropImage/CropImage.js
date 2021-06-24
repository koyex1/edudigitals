import React, { useEffect, useRef, useState } from 'react'
import "./cropImage.css";

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

import { generateDownload } from "../../Config/cropImage";
import { useDispatch, useSelector } from 'react-redux';
import { hideNavBar, ImageCrop } from '../../actions/userActions';
import { dataURLtoFile } from '../../Config/dataURLtoFile';

export default function CropImage({triggerFileSelectPopup}) {
	//const inputRef = useRef();
	const picture = useSelector(state => state.picture);
	const dispatch = useDispatch()


	//const triggerFileSelectPopup = () => inputRef.current.click();

	//const [image, setImage] = useState(null);
	const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	console.log('comonen ar of eh ')

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				dispatch(ImageCrop(reader.result))
			});
		}
	};

	const onDownload = () => {
		generateDownload(picture, croppedArea).then(data=>{
			dispatch(ImageCrop(data))
		})
		dispatch(hideNavBar(false))

	};

	const onCancel = () => {
		dispatch(ImageCrop(null))
		dispatch(hideNavBar(false))


	}

	return (
		<div className='container'>
			<div className='container-cropper'>
				{picture ? (
					<>
						<div className='cropper'>
							<Cropper
								image={picture}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className='slider'>
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</div>
					</>
				) : null}
			</div>

			<div className='container-buttons'>
				
				{/* {<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Choose
				</Button>} */}
				<Button variant='contained' color='primary' onClick={onDownload} style={{ marginRight: "10px" }}>
					Upload
				</Button>
				<Button variant='contained' color='danger' onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</div>
	);
}