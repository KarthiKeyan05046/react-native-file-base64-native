#include <jni.h>
#include "filebase64nativeOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::filebase64native::initialize(vm);
}
