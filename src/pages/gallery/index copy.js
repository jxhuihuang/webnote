
import React, { Component, Fragment } from 'react'
import { render } from 'react-dom';
import { BootCommons, addkeys, removeobj } from '../../utils/utils'
import { Loadding } from 'antd'
import "./index.less";

let galleryList = function (galleryArry = [], blogInfo) {


    const dataInfo = addkeys(galleryArry, "id");
    console.log('dataInfo:', dataInfo);
    class GalleryLists extends Component {
        constructor(props) {
            super(props);
            this.state = {
                client: {}, //屏幕宽高
                galleryList: dataInfo,
                colarry: [],  //列数
                galleryObj: {},
                iscomplete: false,
            }
        }
        componentWillMount() {
            let client = this.getClient();
            const clientWidth = client.width;
            let colNum = clientWidth <= 768 ? 2 : 3;
            let colarry = [];
            let galleryObj = {}
            for (var i = 0; i < colNum; i++) {
                let id = (i + 1);
                galleryObj[id] = galleryObj[id] ? galleryObj[id] : [];
                colarry.push({
                    id: i + 1,
                    col_widrh: 100 / colNum + "%"
                })
            }
            this.setState({
                client: client,
                colarry: colarry,
                galleryObj: galleryObj,
            })
        }
        componentDidMount() {
            let { galleryObj } = this.state;
            window.addEventListener('resize', this.handleResize);
            this.showGalleryLists()
        }

        showGalleryLists = () => {
            let $this = this;
            const { galleryList, galleryObj, iscomplete } = this.state;
            if (galleryList.length <= 0 || iscomplete) {
                return false;
            }

            let min_block = { id: "", height: 0 }
            let block_height = [];
            for (var k in galleryObj) {
                let item = document.getElementById("gallery_" + k)
                let heights = item.offsetHeight;
                block_height.push({ id: k, height: heights })
                if (min_block.height === 0) {
                    min_block.height = heights;
                    min_block.id = k ? parseInt(k) : "";
                } else {
                    if (heights < min_block.height) {
                        min_block.height = heights;
                        min_block.id = k ? parseInt(k) : "";
                    }
                }
            }


            if (min_block.id && min_block.id !== "") {
                let newgalleryList = []
                let current_objs = galleryList[0];
                current_objs.complete = false;
                galleryObj[min_block.id].push(current_objs);
                newgalleryList = removeobj(galleryList, current_objs.id);
                let nowiscomplete = newgalleryList.length > 0 ? false : true; //是否完成
                this.setState({
                    galleryObj,
                    galleryList: newgalleryList,
                    iscomplete: nowiscomplete,
                })
            }
        }
        imgComplete = (itenKey, id) => {
            const { galleryList, galleryObj, iscomplete } = this.state;
            let galleryObjs = galleryObj;
            // console.log('加载完成');
            let datas = galleryObj[itenKey] || [];
            datas.map((obj) => {
                if (obj.id === id) {
                    obj.complete = true;
                }
            })
            galleryObjs[itenKey] = datas;
            this.setState({
                galleryObj: galleryObjs
            }, () => {
                this.showGalleryLists()
            })
        }
        handleResize = () => {
            const { client } = this.state;
            let newClient = this.getClient();
            const clientWidth = newClient.width;
            if (client.width !== clientWidth) {
                setTimeout(() => {
                    let colNum = clientWidth <= 768 ? 2 : 3;
                    let colarry = [];
                    let galleryObj = {}
                    for (var i = 0; i < colNum; i++) {
                        let id = (i + 1);
                        galleryObj[id] = galleryObj[id] ? galleryObj[id] : [];
                        colarry.push({
                            id: i + 1,
                            col_widrh: 100 / colNum + "%"
                        })
                    }
                    this.setState({
                        client: newClient,
                        galleryList: dataInfo,
                        colarry: colarry,
                        galleryObj: galleryObj,
                        iscomplete: false,
                    }, () => {
                        this.showGalleryLists()
                    })
                }, 100);
            }
        }
        getClient = () => {
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        }
        render() {
            const { colarry, galleryObj } = this.state;
            return (
                <Fragment>
                    <div className="gallery-content">
                        {
                            colarry.map((obj) => {
                                return (
                                    <div class="galleryMain_flex" id={"gallery_" + obj.id} ref={"gallery_" + obj.id} style={{ "width": obj.col_widrh }}>
                                        {
                                            galleryObj[obj.id] && galleryObj[obj.id].length > 0 &&
                                            galleryObj[obj.id].map((objs) => {
                                                return (
                                                    <div className="gallery-block">
                                                        {
                                                            !objs.complete &&
                                                            <div className="img_loading">
                                                                <Loadding Loadding />
                                                            </div>
                                                        }
                                                        <a href={objs.href} title={objs.title ? objs.title : ""} style={{ display: !objs.complete ? "none" : "block" }}>
                                                            <img src={objs.src} onLoad={() => !objs.complete && this.imgComplete(obj.id, objs.id)} />
                                                        </a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </Fragment>
            )
        }
    }
    render(<GalleryLists />, document.getElementById("galleryMains"));
}


export {
    galleryList
}


