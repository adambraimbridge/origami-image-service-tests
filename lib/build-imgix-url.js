'use strict';

const ImageServiceUrl = require('./image-service-url');
const ImgixClient = require('imgix-core-js');

module.exports = buildImgixUrl;

function buildImgixUrl(imageServiceUrl, options) {
	if (!(imageServiceUrl instanceof ImageServiceUrl)) {
		throw new Error('Invalid argument, expected instance of ImageServiceUrl');
	}
	const client = new ImgixClient({
		host: `${options.imgixSourceName}.imgix.net`,
		includeLibraryParam: false,
		secureURLToken: options.imgixSecureUrlToken
	});
	return client.buildURL(imageServiceUrl.source, buildImgixTransforms(imageServiceUrl));
}

function buildImgixTransforms(imageServiceUrl) {
	const imageTransforms = {};
	if (imageServiceUrl.width !== undefined) {
		imageTransforms.w = imageServiceUrl.width;
	}
	if (imageServiceUrl.height !== undefined) {
		imageTransforms.h = imageServiceUrl.height;
	}
	imageTransforms.fit = 'crop'; // TODO don't hard-code this
	return imageTransforms;
}