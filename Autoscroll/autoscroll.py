import pyautogui
import time

def scroll_pdf(slow_scroll=True, interval=0.5, scroll_amount=3):
    """
    Simula el desplazamiento en un PDF.
    
    Parámetros:
    - slow_scroll (bool): Si True, se hace un scroll lento simulando pulsaciones de flecha hacia abajo.
    - interval (float): Tiempo entre cada scroll en segundos.
    - scroll_amount (int): Cantidad de unidades de desplazamiento (relevante si slow_scroll es False).
    """
    print("Comenzando el desplazamiento en 3 segundos...")
    time.sleep(3)  # Tiempo para que abras el visor de PDF.

    try:
        if slow_scroll:
            # Scroll lento usando teclas
            while True:  # Mantener el desplazamiento hasta que detengas el programa
                pyautogui.press('down')  # Simula una pulsación de la tecla 'flecha abajo'
                time.sleep(interval)  # Intervalo entre cada pulsación
        else:
            # Scroll suave mediante la rueda del mouse
            while True:
                pyautogui.scroll(-scroll_amount)  # Scroll negativo para bajar
                time.sleep(interval)
    except KeyboardInterrupt:
        print("Desplazamiento detenido.")

# Llama a la función
# Cambia los parámetros según necesites
# scroll_pdf(slow_scroll=True, interval=0.3)  # Scroll lento con flecha abajo
scroll_pdf(slow_scroll=False, interval=0.1, scroll_amount=3)  # Scroll suave con la rueda del mouse
