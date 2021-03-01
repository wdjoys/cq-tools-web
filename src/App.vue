/**
     _         _   _                       _
    / \  _   _| |_| |__   ___  _ __ ___  _(_) __ _  ___   ___ __ _  ___
   / _ \| | | | __| '_ \ / _ \| '__(_) \/ / |/ _` |/ _ \ / __/ _` |/ _ \
  / ___ \ |_| | |_| | | | (_) | |   _ >  <| | (_| | (_) | (_| (_| | (_) |
 /_/   \_\__,_|\__|_| |_|\___/|_|  (_)_/\_\_|\__,_|\___/ \___\__,_|\___/

*/

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
