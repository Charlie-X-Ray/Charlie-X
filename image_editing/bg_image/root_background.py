import os
from PIL import Image 

print(os.getcwd())

im_left = Image.open("bg_left.png")
im_right = Image.open("bg_right.png")
im_right = im_right.crop((0, 0, 600, im_right.height)) #(left,upper,right,lower)

def log_shapes():
    print("Left png has shape (w,h):", im_left.size)
    print("Right png has shape (w,h):", im_right.size)

log_shapes()

if im_left.size[1] != im_right.size[1]:
    im_left.thumbnail((im_left.size[0], im_right.size[1]))

log_shapes()
assert im_left.size[1] == im_right.size[1]

def get_concat_h(im1, im2):
    dst = Image.new('RGBA', (im1.width + im2.width, im1.height))
    dst.paste(im1, (0, 0))
    dst.paste(im2, (im1.width, 0))
    return dst

bg_combined = get_concat_h(im_left, im_right)
bg_combined.putalpha(128)
bg_combined.save("bg_combined.png")


