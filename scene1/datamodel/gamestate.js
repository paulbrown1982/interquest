﻿/* This file contains funtions intended to be used for persistent storage of game data. *//*        This method will return HTML 5 local storage if supported or return false if not present.          return: True if HTML 5 local storage is available or false if it is not available.  */function isHtml5StorageAvailable() {    try {        return 'localStorage' in window && window['localStorage'] !== null;    }     catch (e) {        return false;    }}/*     Try and get the storage mechanism. HTML 5 local storage will be used if available.          Return: Some kind of local storage. This is either HTML 5 local storage or a dummy temporary object. */function getStorage() {    if (!isHtml5StorageAvailable) {        /* Dummy temporary local storage object. */        window.localStorage = new Object();            }    return localStorage;}/*     Safe storage of a value into the local storage.      This method protects against the possibility that the browser does not have local storage.        Param : key The unique key used to store the value    Param : value The value to be stored under that key.    Return: The old value as a String if a value was prevously stored under that key.               True if a new value was stored successfully. False if a value failed to be stored. */function store(key, value) {    var storage = getStorage();    if (key != null && storage != null) {        var existing = storage[key];        /* In case the fall back store is being used that won't automatically store as a String. */                if (value != null) {            value = String(value);        }        storage[key] = value;        return existing;    }    else {        return false;        }}/*    Mechanism to retrieve a value under a specified key.         Return: The value stored under the specified key or null if no value is stored under that key. */function retrieve(key) {    var storage = getStorage();    if (key != null && storage != null) {        storage[key];        }    else {        return null;       }}/*    Get the int value.        Param: key The unique key used to store the integer value.    Return: The value with the specified key as an integer.  */function getInt(key) {    var value = retrieve(key);    if (value != null) {        try {            return parseInt(value);        }        catch (e) {            return 0;              }    }    else {        return 0;       }}/*    Set an integer value.        Param: key The key used to store the value with the specified value.    Param: value The new integer value to be stored under the specified key.    Return: The old value if any or 0 if not. */function setInt(key, value) {    var existing = playerHasObject(key);    try {            store(key, (score != null && parseInt(score)));    }    catch (e) {            }    return existing;}/*    Check if the specified boolean value is set.        Param: key The unique key used to represent the boolean value.    Return: True if the value is present and set to true, false otherwise.  */function playerisBoolSet(key) {    var value = retrieve(key);    if (value != null) {        try {            return Boolean(value);        }        catch (e) {            return false;              }    }    else {        return false;       }}/*    Set the boolean persistant value with the specified id.        Param: key The key used to uniquely identify the game value.    Param: hasObject Whether or not the player has the specified value set.    Return: The old value of the setting with the specified key. */function setBool(key, value) {    var existing = getBoolSet(key);    try {        store(key, (value != null && Boolean(value)));    }     catch (e) {            }    return existing;}/*    Get the game scene identification number.        Return: The current game scene id.  */function getScene() {    return getInt("scene");}/*    Set the game score.        Param: score The new score that the game is to have.    Return: The old score. */function setScene(id) {    var existing = getScene();    setInt("scene", id);    return existing;}/*    Set the game score.        Param: score The new score that the game is to have.    Return: The old score. */function setScore(score) {    var existing = playerHasObject(key);    store("score", (score != null && parseInt(score)));    return existing;}function assert(outcome, failureMessage) {    if (!outcome) {        alert(failureMessage);    }}function testApi() {    assert(isHtml5StorageAvailable () , "HTML 5 storage failed to be found!");    assert(getStorage() != null, "Local storage failed to be retrieved!");    assert(getStorage() != null, "Local storage failed to be retrieved!");    assert(getStorage() != null, "Local storage failed to be retrieved!");    assert(getStorage() != null, "Local storage failed to be retrieved!");    assert(getStorage() != null, "Local storage failed to be retrieved!");    assert(getStorage() != null, "Local storage failed to be retrieved!");}