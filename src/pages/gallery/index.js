import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Playground from "component-playground";
import Link from "gatsby-link";
import { find } from "lodash";
import * as Victory from "victory";

// Child Components
import Footer from "../../partials/footer";
import Icon from "../../partials/icon";

import Preview from "../../partials/gallery/components/preview";
import { configGallery } from "../../partials/gallery/config";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.scope = {
      ...Victory,
      _: require("lodash"),
      React,
      ReactDOM,
      PropTypes
    };
  }

  processCodeText(text) {
    return text
      .replace(/\/\* [global|eslint|NOTE](.|[\n])*?\*\//g, "") // remove dev comments
      .trim(); // remove left-over whitespace
  }

  renderPreviews(config) {
    const previews = config.map((example, index) => {
      return (
        <div key={index} className="Gallery-item">
          <Link to={`/gallery/${example.slug}`}>
            <Preview
              codeText={this.processCodeText(example.code)}
              noRender={false}
              theme="elegant"
              scope={this.scope}
            />
            <p className="Gallery-item-heading">
              {example.text}&nbsp;<Icon glyph="internal-link" />
            </p>
          </Link>
        </div>
      );
    });
    return (
      <article className="Article Article--noBottom">
        <h1 className="u-noMargin">Gallery</h1>
        <div className="Gallery">
          {previews}
        </div>
      </article>
    );
  }

  renderPlayground(slug) {
    const config = configGallery || [];
    const example = find(config, { slug });
    if (!example) {
      return null;
    }
    const current = config.indexOf(example);
    // cycle through gallery array
    const previous = current - 1 > 0 ? current - 1 : config.length - 1;
    const prevIndex = previous % config.length;
    const nextIndex = (current + 1) % config.length;
    const nextExample = config[nextIndex];
    const previousExample = config[prevIndex];
    return (
      <article className="Article Article--noBottom">
        <Link to="/gallery" className="SubHeading">
          Back to Gallery
        </Link>
        <h1 className="u-noMargin">
          {example.text}
        </h1>
        <div className="Grid Grid--justifySpacebetween u-marginTopSm">
          <Link
            to={`/gallery/${previousExample.slug}`}
            className="SubHeading"
          >
            <Icon glyph="back" /> Previous Example
          </Link>
          <Link
            to={`/gallery/${nextExample.slug}`}
            className="SubHeading"
          >
            Next Example <Icon glyph="internal-link" />
          </Link>
        </div>
        <div className="Recipe Recipe--gallery">
          <pre className="u-noMarginTop u-noPadding">
            <div className="Interactive">
              <Playground
                codeText={this.processCodeText(example.code)}
                noRender={false}
                theme="elegant"
                scope={this.scope}
              />
            </div>
          </pre>
        </div>
      </article>
    );
  }

  render() {
    const { location } = this.props;
    const prefix = "/gallery/";
    const slug = location && location.pathname.slice(prefix.length, location.pathname.length);

    const activePage = slug
      ? this.renderPlayground(slug)
      : this.renderPreviews(configGallery);

    return (
      <div>
        { activePage }
        <Footer />
      </div>
    );
  }
}

Gallery.propTypes = {
  location: PropTypes.object.isRequired,
  params: PropTypes.object
};

Gallery.defaultProps = {
  params: null
};

export default Gallery;
