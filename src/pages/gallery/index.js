
import React, { Component, Fragment } from 'react'
import { render } from 'react-dom';
import { checkNull, removeobj, sorts } from '../../utils/utils'
import { Loadding } from 'antd'
import "./index.less";
let galleryList = function (galleryArry = [], blogInfo) {

    class GalleryLists extends Component {
        constructor(props) {
            super(props);
            this.state = {
                client: {}, //屏幕宽高
                dataInfo: [], //原始数据
                waterFallData: [],    //要显示的瀑布流数据 按列显示
                iscomplete: false, //是否全部显示完成
            }
        }
        componentWillMount() {
            this.initGallery()//初始化瀑布流 
        }
        componentDidMount() {
            this.showGalleryLists()
            window.addEventListener('resize', this.handleResize);

        }/***初始化瀑布流 */
        initGallery = (callBack = () => { }) => {
            let client = this.getClient();
            const clientWidth = client.width;
            let colNum = clientWidth <= 768 ? 2 : 3;
            const col_width = 100 / colNum + "%";
            let waterFallData = []
            for (var i = 0; i < colNum; i++) {
                let id = (i + 1);
                waterFallData.push({ id: id, data: [], col_width })
            }
            waterFallData = sorts(waterFallData, "id") //按id排序
            this.setState({
                dataInfo: galleryArry,
                client: client, //屏幕宽高
                waterFallData: waterFallData, //要显示的瀑布流数据 按列显示
                iscomplete: false,       //是否全部显示完成
            }, () => {
                callBack()
            })
        }/***瀑布流加载显示图片 */
        showGalleryLists = () => {
            const { dataInfo = [], waterFallData, iscomplete } = this.state;
            if (dataInfo.length <= 0 || iscomplete) {
                return false;
            }
            let sortwaterFall = []
            waterFallData.map((obj) => {
                let item = document.getElementById("gallery_" + obj.id)
                let heights = item.offsetHeight;
                sortwaterFall.push({ id: obj.id, height: heights })
            })
            sortwaterFall = sorts(sortwaterFall, "height");
            let min_block = sortwaterFall[0] || {};

            if (min_block.id && min_block.id !== "") {
                let current_objs = dataInfo[0];
                let newWaterFallData = waterFallData;
                newWaterFallData.map((item) => {
                    if (item.id === min_block.id) {
                        current_objs.complete = false;
                        (item.data).push(current_objs)
                    }
                })
                let newdataInfo = removeobj(dataInfo, current_objs.id);
                let nowiscomplete = newdataInfo.length > 0 ? false : true; //是否完成
                this.setState({
                    dataInfo: newdataInfo,
                    waterFallData: newWaterFallData,
                    iscomplete: nowiscomplete,
                })
            }
        }/***图片加载完成后继续添加图片 */
        imgComplete = (itenKey, id) => {
            const { waterFallData } = this.state;
            let newWaterFallData = waterFallData;
            newWaterFallData.map((obj) => {
                if (obj.id === itenKey) {
                    (obj.data).map((item) => {
                        if (item.id === id) {
                            item.complete = true;
                        }
                    })
                }
            })
            this.setState({
                waterFallData: newWaterFallData,
            }, () => {
                this.showGalleryLists()
            })
        }/***页面拉伸时重新布局 */
        handleResize = () => {
            const $this = this;
            const { client } = this.state;
            let newClient = this.getClient();
            const clientWidth = newClient.width;
            if (client.width !== clientWidth) {
                setTimeout(() => {
                    this.initGallery(() => {
                        $this.showGalleryLists();
                    })//初始化瀑布流 
                }, 100);
            }
        }/***获取浏览器宽高 */
        getClient = () => {
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        }
        render() {
            const { waterFallData } = this.state;
            return (
                <Fragment>
                    <div className="gallery-content">
                        {
                            waterFallData.map((obj) => {
                                return (
                                    <div class="galleryMain_flex" id={"gallery_" + obj.id} ref={"gallery_" + obj.id} style={{ "width": obj.col_width }}>

                                        {
                                            obj.data && (obj.data).length > 0 &&
                                            (obj.data).map((objs) => {
                                                return (
                                                    <div className="gallery-block" iscomplete={objs.complete ? "true" : "false"}>
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