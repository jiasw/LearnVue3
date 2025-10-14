import { defineStore } from 'pinia'

export const useUserinfoStore = defineStore('userinfo', {
  state: () => ({
    name: 'John Doe',
    age: 25,
    }),

    getters:{

      nameLen(state){
        return state.name.length
      },
      fullname(state){
        return `${state.name} ${state.age}`
      }

    },

    actions: {

      changeName(newName: string) {
        this.name = newName
      },

      changeAge(newAge: number) {
        this.age = newAge
      }

    }
})
