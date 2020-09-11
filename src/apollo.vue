<template>
<span></span>
</template>
<script>
import userByName from './graphql/userByName.gql';
import createUser from './graphql/createUser.gql';
import updateUser from './graphql/updateUser.gql';
import getData from './graphql/getData.gql';
import deleteUser from './graphql/deleteUser.gql';
import updateNick from './graphql/updateNick.gql';
import updatePass from './graphql/updatePass.gql';

import storage from './store/index';

export default {
  name: 'Apollo',
  data() {
    return {
      fPassword: '',
    };
  },
  methods: {
    fetch(arg0, arg1) {
      if (arg0 === 'pass') {
        this.$apollo.query({
          query: userByName,
          variables: {
            name: arg1,
          },
        }).catch(() => {
          this.fPassword = 'error';
        })
          .then((result) => {
            try {
              this.fPassword = result.data.userBYname.password;
            } catch {
              // mute error
            }
            storage.commit('changenick', arg1);
          });
      }
      if (arg0 === 'all') {
        const { nick } = storage.getters;
        this.$apollo.query({
          query: getData,
          variables: {
            name: nick,
          },
        }).then((result) => {
          const data = result.data.userBYname;
          storage.commit('loadData', data);
        });
      }
    },
    create(arg0, arg1) {
      this.$apollo.mutate({
        mutation: createUser,
        variables: {
          name: arg0,
          password: arg1,
        },
      });
    },
    mutate(arg0, arg1) {
      if (arg0 === 'taskList') {
        this.$apollo.mutate({
          mutation: updateUser,
          variables: {
            id: storage.getters.id,
            data: arg1,
          },
        });
      }
      if (arg0 === 'events') {
        this.$apollo.mutate({
          mutation: updateUser,
          variables: {
            id: storage.getters.id,
            Events: arg1,
          },
        });
      }
      if (arg0 === 'nick') {
        this.$apollo.mutate({
          mutation: updateNick,
          variables: {
            id: storage.getters.id,
            name: arg1,
          },
        });
      }
      if (arg0 === 'pass') {
        this.$apollo.mutate({
          mutation: updatePass,
          variables: {
            id: storage.getters.id,
            password: arg1,
          },
        });
      }
    },
    delete() {
      this.$apollo.mutate({
        mutation: deleteUser,
        variables: {
          id: storage.getters.id,
        },
      });
    },
  },
};
</script>
