import Foundation
import NitroModules

@objc(FileBase64Native)
class FileBase64: NSObject, NitroModule {

  static func moduleName() -> String! {
    return "FileBase64Native"
  }

  @objc
  func encode(
    _ path: String,
    resolver resolve: @escaping NitroPromiseResolve,
    rejecter reject: @escaping NitroPromiseReject
  ) {

    DispatchQueue.global(qos: .userInitiated).async {
      do {
        let cleanPath = path.replacingOccurrences(of: "file://", with: "")
        let url = URL(fileURLWithPath: cleanPath)

        let data = try Data(contentsOf: url)
        let base64 = data.base64EncodedString()

        DispatchQueue.main.async {
          resolve(base64)
        }
      } catch {
        DispatchQueue.main.async {
          reject("ENCODE_ERROR", "Failed to encode file", error)
        }
      }
    }
  }
}

