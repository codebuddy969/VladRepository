import React from 'react'
import "./main.scss";

export default class SomePage extends React.Component {

    constructor(props) {
        super(props);

        this.uploadInput = React.createRef();

        this.state = {
            uploadStatus: null,
            preloaderStatus: false,
            responseMessage: "",
            responseLink: 0,
            responseInfo: "",
            progressElements: [],
            formatJpeg: false,
            formatPng: false,
            formatWebp: false,
            smallSize: null,
            mediumSize: null,
            largeSize: null
        };

        this.handleDrop = this.handleDrop.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount() {
        const dropArea = this.refs.droparea;
        if (dropArea) {
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });

            ;['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false);
            });

            ;['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false);
            });

            function preventDefaults(e) {
                e.preventDefault()
                e.stopPropagation()
            }

            function highlight(e) {
                dropArea.classList.add('highlight')
            }

            function unhighlight(e) {
                dropArea.classList.remove('highlight')
            }

            dropArea.addEventListener('drop', this.handleDrop, false)
        }
    }

    handleDrop(e) {
        console.log(e);
        let dt = e.dataTransfer;
        let files = dt.files;

        this.uploadFile([...files])
    }

    handleFiles(elements) {
        this.uploadFile([...elements]);
    }

    uploadFile(files) {

        let url = `http://io.usalinksystem.net:4000/express_backend`;
        let formData = new FormData();

        this.state.formatJpeg ? formData.append("formatJpeg", this.state.formatJpeg) : false;
        this.state.formatPng ? formData.append("formatPng", this.state.formatPng) : false;
        this.state.formatWebp ? formData.append("formatWebp", this.state.formatWebp) : false;

        this.state.smallSize != null ? formData.append("smallSize", this.state.smallSize) : false;
        this.state.mediumSize != null ? formData.append("mediumSize", this.state.mediumSize) : false;
        this.state.largeSize != null ? formData.append("largeSize", this.state.largeSize) : false;

        files.forEach((file) => {
            formData.append("uploads[]", file, file.name);
        });

        this.setState({preloaderStatus: true});

        fetch(url, {method: 'POST', body: formData})
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    responseMessage: data.response,
                    responseLink: data.link,
                    responseInfo: data.message,
                    preloaderStatus: false
                });
                this.uploadInput.current.value = null;
            })
            .catch(() => {});
    }

    setImageType = (type) => {
        this.state[type] ? this.setState({[type]: false}) : this.setState({[type]: true});
    }

    setSizes = (type, size) => {
        this.setState({[type]: size});
    }

    render() {
        return (
            <div>
                <div className="container">
                    {(() => {
                        return (
                            <div id="drop-area" ref="droparea">
                                {this.state.preloaderStatus ? (
                                    <div className="preloader">
                                        <img src="/static/preloader.gif" alt="preloader"/>
                                    </div>
                                ) : false}
                                <form className="my-form">
                                    <p>Optimize files by pressing the button below or by dragging and dropping images
                                        onto the dashed region</p>
                                    <input name="image"
                                           type="file"
                                           id="fileElem"
                                           multiple
                                           accept="images/*"
                                           ref={this.uploadInput}
                                           onChange={(e) => {
                                               this.uploadFile([...e.currentTarget.files])
                                           }}/>
                                    <div className="options__headline">Convert to formats:</div>
                                    <div className="options">
                                        <div className="options__group">
                                            <label className={`options__format ${this.state.formatWebp ? 'active' : ''}`}
                                                   htmlFor="format-webp">
                                                Webp
                                            </label>
                                            <input className="options__checkbox"
                                                   type="checkbox"
                                                   id="format-webp"
                                                   name='format-webp'
                                                   onClick={() => this.setImageType('formatWebp')} />
                                        </div>
                                        <div className="options__group">
                                            <label className={`options__format ${this.state.formatJpeg ? 'active' : ''}`}
                                                   htmlFor="format-jpeg">
                                                Jpeg
                                            </label>
                                            <input className="options__checkbox"
                                                   type="checkbox"
                                                   id="format-jpeg"
                                                   name='format-jpeg'
                                                   onClick={() => this.setImageType('formatJpeg')} />
                                        </div>
                                        <div className="options__group">
                                            <label className={`options__format ${this.state.formatPng ? 'active' : ''}`}
                                                   htmlFor="format-png">
                                                Png
                                            </label>
                                            <input className="options__checkbox"
                                                   type="checkbox"
                                                   id="format-png"
                                                   name='format-png'
                                                   onClick={() => this.setImageType('formatPng')} />
                                        </div>
                                    </div>
                                    <div className="sizes__headline">Set Sizes:</div>
                                    <div className="sizes">
                                        <div className="sizes__group">
                                            <input className="sizes__field"
                                                   type="number"
                                                   min="0"
                                                   max="800"
                                                   id="sizes-small"
                                                   name="sizes-small"
                                                   placeholder="Small"
                                                   onChange={e => this.setSizes('smallSize', e.target.value)} />
                                        </div>
                                        <div className="sizes__group">
                                            <input className="sizes__field"
                                                   type="number"
                                                   min="0"
                                                   max="1200"
                                                   id="sizes-medium"
                                                   name="sizes-medium"
                                                   placeholder="Medium"
                                                   onChange={e => this.setSizes('mediumSize', e.target.value)} />
                                        </div>
                                        <div className="sizes__group">
                                            <input className="sizes__field"
                                                   type="number"
                                                   min="0"
                                                   max="2000"
                                                   id="sizes-large"
                                                   name="sizes-large"
                                                   placeholder="Large"
                                                   onChange={e => this.setSizes('largeSize', e.target.value)} />
                                        </div>
                                    </div>

                                    <label className="button-optimize" htmlFor="fileElem">
                                        Select single image
                                    </label>
                                </form>
                            </div>
                        )
                    })()}

                    <a className="upload-response" href={this.state.responseLink}>{this.state.responseMessage}</a>

                    <div className="upload-info">{this.state.responseInfo}</div>
                </div>
            </div>
        );
    }
}
