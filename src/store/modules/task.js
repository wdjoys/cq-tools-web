import BaseModule from './base_module'

import { Task } from '@/api/restful/restful'

const task = new BaseModule('task', Task)

const taskExtends = {
    actions: {
        // 计算出未执行的任务
        task_not_execute ({ state, commit }) {
            const nowTimeStamp = new Date().getTime()

            const taskTemp = state.task.filter(task => {
                // 时间大于当前 或者是循环任务
                return task.time * 1000 > nowTimeStamp || task.model === 1
            })
            // console.log(state.task.length, taskTemp.length, 'kkkkkkkkkkk')
            if (state.task.length !== taskTemp.length) {
                commit('SET', taskTemp)
                return true
            } else {
                return false
            }
        }
    }
}

// 扩展属性
Object.assign(task.actions, taskExtends.actions)
export default task
