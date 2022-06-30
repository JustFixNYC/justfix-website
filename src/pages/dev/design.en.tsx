import React from "react";
import Layout from "../../components/layout";

import "../../styles/dev-design.scss";

export const DevDesignPage = () => {
  return (
    <Layout metadata={{ title: "JustFix Design System" }}>
      <div className="page-content">
      <section className="hero-body">
        <h1 className="title">JustFix Design System</h1>
      </section>
      <section id="section-palette" className="hero-body">
        <h2 className="section-title">Color Palette</h2>
        <div id="palette-swatches">
          <div id="colors-box">
            <div id="green-box">
              <div className="color-info">
                <p>Green</p>
                <p>#1AA551</p>
                <p>RGB 26 165 81</p>
                <p>CMYK 82 8 96 0</p>
              </div>
            </div>
            <div id="pink-box">
              <div className="color-info">
                <p>Pink</p>
                <p>#FFA0C7</p>
                <p>RGB 255 160 199</p>
                <p>CMYK 0 48 0 0 </p>
              </div>
            </div>
            <div id="yellow-box">
              <div className="color-info">
                <p>Yellow</p>
                <p>#FFBA33</p>
                <p>RGB 255 186 51</p>
                <p>CMYK 0 30 90 </p>
              </div>
            </div>
            <div id="orange-box">
              <div className="color-info">
                <p>Orange</p>
                <p>#FF813A</p>
                <p>RGB 255 129 58</p>
                <p>CMYK 0 61 84 0 </p>
              </div>
            </div>
            <div id="blue-box">
              <div className="color-info">
                <p>Blue</p>
                <p>#5188FF</p>
                <p>RGB 81 136 255 </p>
                <p>CMYK 65 42 0 0 </p>
              </div>
            </div>
          </div>
          <div id="greyscale-box">
            <div id="white-box">
              <div className="color-info">
                <p>Off White</p>
                <p>#FAF8F4</p>
                <p>RGB 250 248 244</p>
                <p>CMYK 1 1 3 0 </p>
              </div>
            </div>
            <div id="grey-light-box">
              <div className="color-info">
                <p>Light Gray</p>
                <p>#D4D5D0</p>
                <p>RGB 212 213 208</p>
                <p>CMYK 0 0 2 16</p>
              </div>
            </div>
            <div id="grey-dark-box">
              <div className="color-info">
                <p>Dark Gray</p>
                <p>#676565</p>
                <p>RGB 103 101 101 </p>
                <p>CMYK 0 1 1 60 </p>
              </div>
            </div>
            <div id="black-box">
              <div className="color-info">
                <p>Off Black</p>
                <p>#242323</p>
                <p>RGB 35 35 35</p>
                <p>CMYK 71 66 64 72</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section-typography" className="hero-body has-text">
        <h2 className="section-title">Typography</h2>
        <div id="type-samples">
          <div id="desktop-text">
            <h1>h1_desktop</h1>
            <h2>H2_desktop</h2>
            <h3>H3_desktop</h3>
            <h4>H4_desktop</h4>
            <p>Body_Standard_Desktop</p>
            <a>Body-Standard-Link_Desktop</a>
            <p className="is-small">Small-Text_Desktop</p>
            <p className="is-small is-bold">Small-Text-Bold_Desktop</p>
            <p className="eyebrow">Eyebrow_Large_Desktop</p>
            <p className="eyebrow is-small">Eyebrow_Small_Desktop</p>
          </div>
          <div id="mobile-text">
            <h1>h1_mobile</h1>
            <h2>h2_mobile</h2>
            <h3>h3_mobile</h3>
            <p>body-standard_mobile</p>
            <a className="link">body-standard-link_mobile</a>
            <p className="is-small">small-text_mobile</p>
            <p className="is-small link">small-text-link_mobile</p>
            <p className="is-small link is-bold">small-text-bold-link_mobile</p>
          </div>
        </div>
      </section>
      <section id="section-buttons" className="hero-body has-text">
        <h2 className="section-title">Buttons</h2>
        <div id="button-samples" className="buttons">
          <button className="button is-primary">Primary</button>
          <button className="button is-secondary">Secondary</button>
        </div>
      </section>
      <section id="section-pills" className="hero-body has-text">
        <h2 className="section-title">Pills</h2>
        <div id="pill-samples">
          <span className="tag is-yellow">text</span>
          <span className="tag is-blue">text</span>
          <span className="tag is-pink">text</span>
          <span className="tag is-empty">text</span>
        </div>
      </section>
      </div>
    </Layout>
  );
};
export default DevDesignPage;
