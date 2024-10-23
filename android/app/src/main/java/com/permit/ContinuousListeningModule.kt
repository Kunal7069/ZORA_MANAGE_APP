package com.permit

import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class ContinuousListeningModule(private val reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext), RecognitionListener {

    private var speech: SpeechRecognizer? = null
    private lateinit var recognizerIntent: Intent

    init {
        initializeSpeechRecognizer()
    }

    override fun getName(): String = "ContinuousListening"

    private fun initializeSpeechRecognizer() {
        speech = SpeechRecognizer.createSpeechRecognizer(reactContext)
        speech?.setRecognitionListener(this)
        recognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, reactContext.packageName)
            putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        }
    }

    @ReactMethod
    fun startListening() {
        speech?.startListening(recognizerIntent)
    }

    @ReactMethod
    fun stopListening() {
        speech?.stopListening()
    }

    override fun onResults(results: Bundle?) {
        val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
        matches?.firstOrNull()?.let { text ->
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onSpeechResult", text)
        }
        speech?.startListening(recognizerIntent)
    }

    // Implement other RecognitionListener methods
    override fun onReadyForSpeech(params: Bundle?) {}
    override fun onBeginningOfSpeech() {}
    override fun onRmsChanged(rmsdB: Float) {}
    override fun onBufferReceived(buffer: ByteArray?) {}
    override fun onEndOfSpeech() {}
    override fun onError(error: Int) {}
    override fun onPartialResults(partialResults: Bundle?) {}
    override fun onEvent(eventType: Int, params: Bundle?) {}
}