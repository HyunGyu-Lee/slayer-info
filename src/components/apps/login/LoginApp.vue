<template>
  <app-base appName="">
    <app-row align="center" justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title primary-title class="justify-center">
            <div>
              <h3 class="headline pink--text text--accent-2"><b>슬레이어키우기 계산기 v0.1</b></h3>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="loginForm" v-model="loginFormValid" lazy-validation>
              <v-row dense justify="center">
                <v-col cols="8">
                  <v-text-field dense prepend-icon="mdi-identifier" v-model="userId" :rules="rules.idRules" /> 
                </v-col>
              </v-row>
              <v-row dense justify="center">
                <v-col cols="8">
                  <v-text-field type="password" dense prepend-icon="mdi-key" v-model="password" :rules="rules.passwordRules" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="clickLogin">로그인</v-btn>
            <v-btn color="warning" @click="clickRegister">회원가입</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </app-row>
    <v-dialog v-model="registerPopup" persistent max-width="600px">
      <v-card :loading="registerLoading" :disabled="registerLoading">
        <v-card-title>
          <span class="text-h5">회원가입</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="registerForm" v-model="registerFormValid">
              <v-row>              
                <v-col cols="12">
                  <v-text-field label="사용할 ID를 입력하세요" v-model="registerId" required :rules="rules.idRules"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="비밀번호를 입력하세요" type="password" v-model="registerPassword" required :rules="rules.passwordRules"></v-text-field>
                </v-col>              
              </v-row>
            </v-form>
          </v-container>
          <small>* 비밀번호는 암호화하여 저장됩니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="registerPopup = false">취소</v-btn>
          <v-btn color="blue darken-1" text @click="doRegister">회원가입</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </app-base>
</template>

<script>
import UserService from '@/modules/service/user';

export default {
  name: 'LoginApp',
  data() {
    return {
      loginFormValid: true,
      registerFormValid: true,      
      userId: '',
      password: '',
      registerId: '',
      registerPassword: '',
      registerPopup: false,
      registerLoading: false,
      rules: {
        idRules: [
          v => !!v || '아이디를 입력해주세요',
          v => (v && (v.length >= 4 && v.length <= 10)) || '아이디는 4 ~ 10자 사이여야합니다.'
        ],
        passwordRules: [
          v => !!v || '비밀번호를 입력해주세요',
          v => (v && (v.length >= 8 && v.length <= 20)) || '비밀번호는 8 ~ 20자 사이여야합니다.'
        ]
      }
    }
  },
  methods: {
    clickLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('login', { userId: this.userId, password: this.password });
      }
    },
    clickRegister() {
      this.registerPopup = true;
    },
    async doRegister() {
      if (this.$refs.registerForm.validate()) {
        this.registerLoading = true;
        UserService.register(this.registerId, this.registerPassword).then(() => {
          this.registerLoading = false;
          this.registerPopup = false;
          this.$store.dispatch('login', { userId: this.registerId, password: this.registerPassword });
        });         
      }
    }
  }
}
</script>

<style>

</style>