<template>
    <minimal-layout :pageTitle="page_title">    
        
        <div id="container">
            
            <ion-grid>
                <ion-row style="height: 100vh;" class="ion-text-center ion-align-items-center">
                    <ion-col>
                        <div style="border-radius: 20px; background-color: white; opacity: 95%; padding: 1rem; margin: 1rem; padding-bottom: 3rem">
              <img style="width: 90%; height: 90%; margin-top: 2rem; margin-bottom: 2rem;" src="/assets/images/responderone_attribution.png"><br>

              <ion-item class="ion-margin">
                                <ion-label position="stacked">Username</ion-label>
                                <ion-input type="email" v-model="username"></ion-input>
                            </ion-item>

                            <ion-item class="ion-margin">
                                <ion-label position="stacked">Password</ion-label>
                                <ion-input type="password" v-model="password" @keyup.enter="login()"></ion-input>
                            </ion-item>

                            <ion-button @click="login()" :disabled="disabled" class="ion-margin" color="primary" fill="outline" expand="block" style="margin-top: 3rem;">
                                <span v-if="login_button"><i class="fas fa-circle-notch fa-spin fa-fw fa-lg"></i></span>
                                <span v-else>Login</span>
                            </ion-button>

                            <ion-button v-if="login_error" disabled="true" class="ion-margin" color="danger" expand="block">
                                Username or Password incorrect
                            </ion-button>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>


        </div>

    <template v-slot:footer>
      <ion-toolbar>
        <ion-title style="font-weight: 200; font-size: 11px;">
          Responder.One Mobile<br>Created by Skerric Pty Ltd &copy; 2022
        </ion-title>
      </ion-toolbar>
    </template>

    </minimal-layout>
</template>

<script lang="ts">
import { 
    IonGrid, 
    IonRow, 
    IonCol,
    IonLabel, 
    IonInput, 
    IonItem,
    IonButton,
    IonToolbar,
    IonTitle,

    getPlatforms,
} from "@ionic/vue";

export default {
    data() {
        return {
            page_title: 'Responder.One - Login',
            username: null,
            password: null,

            login_button: false,
            login_error: false,
        };
    },

    components: { 
    IonGrid, 
    IonRow, 
    IonCol,
    IonLabel, 
    IonInput, 
    IonItem,
    IonButton,
    IonToolbar,
    IonTitle,
    },

    mounted() {
        console.log('You are on: ' + getPlatforms());
        console.log(this.$store.getters['config/mobile_http_url']);
    },
};
</script>

<style scoped>

</style>
