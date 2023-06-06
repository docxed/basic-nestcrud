<template>
  <v-container fluid fill-height>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="5">
        <div class="my-auto mx-3 text-center">
          <p class="display-2 font-weight-black">🚀 Nest</p>
        </div>
      </v-col>
      <v-col cols="12" sm="7">
        <v-card class="my-10">
          <v-card-title>ลงทะเบียนเข้าใช้งาน</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                color="purple"
                v-model="form.email"
                :rules="[$rules.required, ...$rules.emailRules]"
                label="อีเมล"
              />
              <v-row gutter>
                <v-col>
                  <v-text-field color="purple" v-model="form.firstname" label="ชื่อ" />
                </v-col>
                <v-col>
                  <v-text-field color="purple" v-model="form.lastname" label="นามสกุล" />
                </v-col>
              </v-row>
              <v-text-field
                color="purple"
                type="password"
                v-model="form.password"
                :rules="[$rules.required]"
                label="รหัสผ่าน"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn color="purple white--text" @click="submit()"> ลงทะเบียน </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'full-screen',
  head() {
    return {
      title: 'ลงทะเบียนเข้าใช้งาน',
      meta: [
        {
          hid: 'ZTX App - ลงทะเบียนเข้าใช้งาน',
          name: 'ZTX App - ลงทะเบียนเข้าใช้งาน',
          content: 'ZTX App | ลงทะเบียนเข้าใช้งาน',
        },
      ],
    }
  },
  data: () => ({
    loading: false,
    form: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
    },
  }),
  methods: {
    ...mapActions('messages', ['setMessage']),

    async submit() {
      this.$loader(true)
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.post('/auth/signup', this.form)
          this.clear()
          this.setMessage({
            title: 'ลงทะเบียนสำเร็จ',
            type: 'ดำเนินการ',
            color: 'success',
          })
        } catch (error) {
          console.error(error)
        }
      }
      this.$loader(false)
    },
    clear() {
      this.form.email = ''
      this.form.firstname = ''
      this.form.lastname = ''
      this.form.password = ''
      this.$refs.form.resetValidation()
    },
  },
}
</script>
