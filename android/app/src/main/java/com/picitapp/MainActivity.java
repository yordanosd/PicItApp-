package com.picitapp;

import com.facebook.react.ReactActivity;

// added the following:
import android.content.Intent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PicItApp";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
