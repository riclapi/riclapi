

islogging = false;
isLogged = false;

function loginWithWallet(account) {
    if (islogging) return;
    islogging = true;
    console.log("login");
    PlayFab.settings.titleId = "6AEAF";
    var loginRequest = {
        // Currently, you need to look up the correct format for this object in the API-docs:
        // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
        TitleId: PlayFab.settings.titleId,
        CustomId: account,
        CreateAccount: true
    };

    PlayFabClientSDK.LoginWithCustomID(loginRequest, LoginCallback);
}

var LoginCallback = function (result, error) {
    islogging = false;
    if (result !== null) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("gameContainer").style.display = "unset";
        isLogged = true;
        createGame();
        callCloud();

    } else if (error !== null) {
        console.log(
            "Something went wrong with your first API call.\n" +
            "Here's some debug information:\n" +
            CompileErrorReport(error));
    }
}

// This is a utility function we haven't put into the core SDK yet.  Feel free to use it.
function CompileErrorReport(error) {
    if (error === null)
        return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}

function UpdatePlayerStatistics(value) {
    var request = {
        Statistics: [
            {
                StatisticName: "scores",
                Value: value
            }
        ]
    };
    PlayFabClientSDK.UpdatePlayerStatistics(request, Callback);
}
var Callback = function (result, error) {
    // context
}

function callCloud() {
    var helloworld = {};

    helloworld.FunctionParameter = "ric"

    helloworld.FunctionName = 'ttt';
    PlayFabClientSDK.ExecuteCloudScript(helloworld, OnCloudHelloWorld, OnErrorShared);

}

var OnCloudHelloWorld = function (result) {
    console.log(result.data.FunctionResult);
}

var OnErrorShared = function (error) {
    console.log("ff");
    console.log(error);
}