import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7"
  },
  pageHeader: {
    backgroundColor: "#8257E5",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 16
  },
  subTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#D4C2FF",
    marginBottom: 40
  },
  form: {
    marginTop: -40,
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6F0",
    flex: 1
  },
  formContent: {
    paddingHorizontal: 24,
  },
  formLabel: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6F0",
    paddingBottom: 8,
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontFamily: "Archivo_600SemiBold",
    fontSize: 20,
    color: "#32264D",
  },
  addButton: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  addText: {
    fontFamily: "Archivo_600SemiBold",
    color: "#8257E5",
    fontSize: 14
  },
  profile: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50
  },
  name: {
    fontFamily: "Archivo_700Bold",
    color: "#32264D",
    fontSize: 20
  },
  subject: {
    fontFamily: "Poppins_400Regular",
    color: "#6A6180",
    fontSize: 12
  },
  inputBlock: {
    flex: 1
  },
  inputGroup: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24
  },
  divider: {
    height: 1,
    backgroundColor: "#E6E6F0",
    flex: 1
  },
  textDelete: {
    fontFamily: "Archivo_600SemiBold",
    fontSize: 12,
    marginHorizontal: 24,
    color: "#E33D3D"
  },
  formFooter: {
    marginTop: 40,
    backgroundColor: "#FAFAFC",
    borderTopColor: "#E6E6F0",
    borderTopWidth: 1,
    padding: 24,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  footerWarning: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textWarning: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  }
});

export default styles;