/**
 * Created by orange on 2017/8/13.
 */
import {utils} from '../common/js/utils'
//全局触发事件
export default {
    increment (state){
        state.count++;
    },
    decrement (state){
        state.count--;
    },
    addNewsArr(state,item){
        state.newsArr = item;
    }
}
