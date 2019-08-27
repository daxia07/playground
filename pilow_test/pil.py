from PIL import Image
import os

current_folder = os.path.dirname(os.path.abspath(__file__))
# im = Image.open('/Users/daxia/PycharmProjects/playground/pilow_test/website-logo.png')
filename = os.path.join(current_folder, 'website-logo.png')
im = Image.open(filename)

print(im.format, im.size, im.mode)